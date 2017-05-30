<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="guess.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
        }
        .auto-style2 {
            width: 268px;
        }
        .auto-style6 {
            width: 270px;
        }
        .auto-style7 {
            width: 563px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <table class="auto-style1">
            <tr>
                <td class="auto-style2">Name</td>
                <td class="auto-style6">
                    <asp:TextBox ID="tbName" runat="server" Height="21px" Width="255px"></asp:TextBox>
                </td>
                <td class="auto-style7">
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="tbName" ErrorMessage="Error" ForeColor="#FF0066">*</asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">Email</td>
                <td class="auto-style6">
                    <asp:TextBox ID="tbEmail" runat="server" Width="258px"></asp:TextBox>
                </td>
                <td class="auto-style7">
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="tbEmail" ErrorMessage="Error" ForeColor="#FF0066">*</asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">Inscription</td>
                <td class="auto-style6">
                    <asp:TextBox ID="tbInscription" runat="server" Height="47px" TextMode="MultiLine" Width="264px"></asp:TextBox>
                </td>
                <td class="auto-style7">
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="tbInscription" ErrorMessage="RequiredFieldValidator" ForeColor="#FF0066">*</asp:RequiredFieldValidator>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="RegularExpressionValidator" ForeColor="#FF0066" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ControlToValidate="tbEmail">Wrong Email </asp:RegularExpressionValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2"></td>
                <td class="auto-style6">
                    <asp:ValidationSummary ID="ValidationSummary1" runat="server" ForeColor="#FF0066" HeaderText="Error" Width="267px" />
                </td>
                <td class="auto-style7">
                    <asp:Label ID="usersOnline" runat="server"></asp:Label>
                    <asp:Label ID="usersTotal" runat="server"></asp:Label>
                </td>
            </tr>
        </table>
        <asp:Button ID="Add" runat="server" OnClick="Button1_Click" style="margin-left: 398px" Text="Add" Width="252px" />
    </form>
</body>
</html>
