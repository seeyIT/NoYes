using System;
using System.Net;
using NetworkCommsDotNet;
using NetworkCommsDotNet.DPSBase;
using NetworkCommsDotNet.Tools;
using NetworkCommsDotNet.Connections;
using NetworkCommsDotNet.Connections.TCP;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;



namespace ChatWPF
{
    public partial class MainWindow : Window
    {

        public  MainWindow()
        {

            InitializeComponent();
          
            NetworkComms.AppendGlobalIncomingPacketHandler<Wiadomosc>("ChatMessage", HandleIncomingChatMessage);

            NetworkComms.AppendGlobalConnectionCloseHandler(HandleConnectionClosed);
            ToggleServerMode(true);
            sendMessageButton.IsEnabled = false;
            Disconnect.IsEnabled = false;
            localName.Text = "Random:)";
        }

        Dictionary<ShortGuid, Wiadomosc> allMessages = new Dictionary<ShortGuid, Wiadomosc>();

        int relay = 3;

        long messageSendIndex = 0;

        private ConnectionInfo serverConnectionInfo;

        private void AppendLineToChatBox(string message)
        {
            chatBox.Dispatcher.BeginInvoke(new Action<string>((messageToAdd) =>
            {
                chatBox.AppendText(messageToAdd + "\n");
                chatBox.ScrollToEnd();
            }), new object[] { message });
        }

        private void RefreshMessagesFromBox()
        {
            lock (allMessages)
            {
                string[] currentUsers = (from current in allMessages.Values orderby current.SourceName select current.SourceName).ToArray();

                this.messagesFrom.Dispatcher.BeginInvoke(new Action<string[]>((users) =>
                {
                    messagesFrom.Text = "";

                    foreach (var username in users)
                        messagesFrom.AppendText(username + "\n");
                }), new object[] { currentUsers });
            }
        }

        private void ToggleServerMode(bool enableServer)
        {
            if (enableServer)
            {
               Connection.StartListening(ConnectionType.TCP, new IPEndPoint(IPAddress.Any, 0));
                foreach (IPEndPoint listenEndPoint in Connection.ExistingLocalListenEndPoints(ConnectionType.TCP))
                {
                    serverIP.Text = listenEndPoint.Address.ToString();
                    serverPort.Text = listenEndPoint.Port.ToString();
                    break;
                }
            }
            else
            {
                NetworkComms.Shutdown();
                chatBox.AppendText("Error");
            }
        }

        private void HandleIncomingChatMessage(PacketHeader header, Connection connection, Wiadomosc incomingMessage)
        {
            lock (allMessages)
            {
                if (allMessages.ContainsKey(incomingMessage.SourceIdentifier))
                {
                    if (allMessages[incomingMessage.SourceIdentifier].MessageIndex < incomingMessage.MessageIndex)
                    {
                        AppendLineToChatBox(incomingMessage.SourceName + " - " + incomingMessage.Message);

                        allMessages[incomingMessage.SourceIdentifier] = incomingMessage;
                    }
                }
                else
                {
                    allMessages.Add(incomingMessage.SourceIdentifier, incomingMessage);
                    AppendLineToChatBox(incomingMessage.SourceName + " - " + incomingMessage.Message);
                }
            }

            RefreshMessagesFromBox();

            if (incomingMessage.RelayCount < relay)
            {
                var allRelayConnections = (from current in NetworkComms.GetExistingConnection() where current != connection select current).ToArray();

                incomingMessage.IncrementRelayCount();

                foreach (var relayConnection in allRelayConnections)
                {
                    try { relayConnection.SendObject("ChatMessage", incomingMessage); }
                    catch (CommsException) {  }
                }
            }
        }
        private void HandleConnectionClosed(Connection connection)
        {
            lock (allMessages)
            {
                ShortGuid remoteIdentifier = connection.ConnectionInfo.NetworkIdentifier;

                if (allMessages.ContainsKey(remoteIdentifier))
                    AppendLineToChatBox("Zakonczono polaczenie z " + allMessages[remoteIdentifier].SourceName);
                else
                    AppendLineToChatBox("Rozlaczono");

                allMessages.Remove(connection.ConnectionInfo.NetworkIdentifier);
            }

            RefreshMessagesFromBox();
        }
        private void SendMessage()
        {
            if (messageText.Text.Trim() == "") return;

            ConnectionInfo serverConnectionInfo = null;
            if (serverIP.Text != "")
            {
                try { serverConnectionInfo = new ConnectionInfo(serverIP.Text.Trim(), int.Parse(serverPort.Text)); }
                catch (Exception)
                {
                    MessageBox.Show("Zly  IP lub Port! ");
                    return;
                }
            }

            Wiadomosc messageToSend = new Wiadomosc(NetworkComms.NetworkIdentifier, localName.Text, messageText.Text, messageSendIndex++);

            lock (allMessages) allMessages[NetworkComms.NetworkIdentifier] = messageToSend;

            AppendLineToChatBox(messageToSend.SourceName + " - " + messageToSend.Message);

            RefreshMessagesFromBox();

            this.messageText.Text = "";

            if (serverConnectionInfo != null)
            {
                try { TCPConnection.GetConnection(serverConnectionInfo).SendObject("ChatMessage", messageToSend); }
                catch  {  }
            }

            var otherConnectionInfos = (from current in NetworkComms.AllConnectionInfo() where current != serverConnectionInfo select current).ToArray();
            foreach (ConnectionInfo info in otherConnectionInfos)
            {
                try { TCPConnection.GetConnection(info).SendObject("ChatMessage", messageToSend); }
                catch (CommsException) { MessageBox.Show("Error !"); }
            }
        }

        private void sendMessageButton_Click(object sender, RoutedEventArgs e)
        {
            SendMessage();
        }

        private void Disconnect_Click(object sender, RoutedEventArgs e)
        {
            NetworkComms.Shutdown();
            Connect.IsEnabled = true;
            Disconnect.IsEnabled = false;
            sendMessageButton.IsEnabled = false;
            RefreshMessagesFromBox();
        }

        private void Connect_Click(object sender, RoutedEventArgs e)
        {
            
            chatBox.AppendText("Polaczono z "+ serverIP.Text.ToString() + "\n");
            Connect.IsEnabled = false;
            Disconnect.IsEnabled = true;
            sendMessageButton.IsEnabled = true;
            RefreshMessagesFromBox();
        }
    }
}
