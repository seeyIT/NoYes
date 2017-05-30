<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RegisterPage.aspx.cs" Inherits="ProjektKoncowy.RegisterPage" %>

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
        <br />
        <asp:TextBox ID="passwordTB1" runat="server" TextMode="Password"></asp:TextBox>
        <br />
        <asp:TextBox ID="passwordTB2" runat="server" TextMode="Password"></asp:TextBox>
        <br />
        <br />
        <asp:Button ID="registerB" runat="server" OnClick="registerB_Click" Text="Register" />
        <br />
    
    </div>
    </form>
</body>
</html>
