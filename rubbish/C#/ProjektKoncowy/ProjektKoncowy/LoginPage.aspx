<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginPage.aspx.cs" Inherits="ProjektKoncowy.LoginPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <asp:TextBox ID="loginTB" runat="server"></asp:TextBox>
        <br />
        <asp:TextBox ID="passwordTB" runat="server" TextMode="Password"></asp:TextBox>
        <br />
        <asp:Button ID="loginB" runat="server" OnClick="loginB_Click" Text="Zaloguj" />
    
    </div>
    </form>
</body>
</html>
