<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GuessList.aspx.cs" Inherits="guess.GuessList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
        <asp:Xml ID="Xml1" runat="server" DocumentSource="~/bok.xml" TransformSource="~/Bok.xslt"></asp:Xml>
        <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/WebForm1.aspx">HyperLink</asp:HyperLink>
    </form>
</body>
</html>
