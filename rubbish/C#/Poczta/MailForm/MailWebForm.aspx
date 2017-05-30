<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MailWebForm.aspx.cs" Inherits="MailForm.MailWebForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
        }
        .midCol {
            text-align: center;
        }
        #TextArea1 {
            height: 153px;
            width: 353px;
        }
        #taText {
            height: 208px;
            width: 350px;
        }
        .auto-style2 {
            height: 26px;
        }
        .auto-style3 {
            text-align: center;
            height: 26px;
        }
        .auto-style4 {
            height: 49px;
        }
        .auto-style5 {
            text-align: center;
            height: 49px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td>&nbsp;</td>
                <td class="midCol">
                    <asp:Button ID="bClear" runat="server" OnClick="bClear_Click" Text="Clear" />
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="lFrom" runat="server" Text="From"></asp:Label>
                </td>
                <td class="auto-style3">
                    <asp:TextBox ID="tbFrom" runat="server" Width="350px"></asp:TextBox>
                </td>
                <td class="auto-style2"></td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lTo" runat="server" Text="To"></asp:Label>
                </td>
                <td class="midCol">
                    <asp:TextBox ID="tbTo" runat="server" Width="350px"></asp:TextBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lSubject" runat="server" Text="Subject"></asp:Label>
                </td>
                <td class="midCol">
                    <asp:TextBox ID="tbSubject" runat="server" Width="350px"></asp:TextBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lText" runat="server" Text="Text"></asp:Label>
                </td>
                <td class="midCol">
                    <asp:TextBox ID="tbText" runat="server" Height="210px" Width="350px"></asp:TextBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style4">
                    <asp:Label ID="lSMTP" runat="server" Text="SMTP Server"></asp:Label>
                </td>
                <td class="auto-style5">
                    <asp:TextBox ID="tbSMTP" runat="server" Width="190px" style="margin-left: 0px"></asp:TextBox>
                </td>
                <td class="auto-style4"></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td class="midCol">
                    <asp:Button ID="bSend" runat="server" Height="36px" OnClick="bSend_Click" Text="Send" Width="71px" />
                    <br />
                    <asp:Label ID="lInfo1" runat="server"></asp:Label>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lAttachments" runat="server">Attachments</asp:Label>
                </td>
                <td class="midCol">
                    <asp:FileUpload ID="FileUpload1" runat="server" Width="350px" />
                </td>
                <td>
                    <asp:Button ID="bSave" runat="server" OnClick="bSave_Click" Text="Save" />
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td class="midCol">
                    <asp:ListBox ID="lbAttach" runat="server" Height="111px" Width="350px"></asp:ListBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td class="midCol">
                    <asp:Label ID="lInfo2" runat="server"></asp:Label>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
