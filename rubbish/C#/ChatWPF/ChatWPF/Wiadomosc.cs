using NetworkCommsDotNet;
using NetworkCommsDotNet.Tools;
using ProtoBuf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace ChatWPF
{
    [ProtoContract]
    class Wiadomosc
    {
        
        [ProtoMember(1)]
        string _sourceIdentifier;

        
        public ShortGuid SourceIdentifier { get { return new ShortGuid(_sourceIdentifier); } }

       
        [ProtoMember(2)]
        public string SourceName { get; private set; }

        
        [ProtoMember(3)]
        public string Message { get; private set; }

       
        [ProtoMember(4)]
        public long MessageIndex { get; private set; }

       
        [ProtoMember(5)]
        public int RelayCount { get; private set; }

        private Wiadomosc() { }

        
        public Wiadomosc(ShortGuid sourceIdentifier, string sourceName, string message, long messageIndex)
        {
            this._sourceIdentifier = sourceIdentifier;
            this.SourceName = sourceName;
            this.Message = message;
            this.MessageIndex = messageIndex;
            this.RelayCount = 0;
        }

       
        public void IncrementRelayCount()
        {
            RelayCount++;
        }
    }
}