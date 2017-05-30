<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="Ksiegagosci.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
        }
        .auto-style2 {
            width: 239px;
        }
        .auto-style3 {
            width: 329px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style2">imie</td>
                <td class="auto-style3">
                    <asp:TextBox ID="tbImie" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="tbImie" ErrorMessage="Pole wymagane" ForeColor="#FF0066">Pole wymagane</asp:RequiredFieldValidator>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">nazwisko</td>
                <td class="auto-style3">
                    <asp:TextBox ID="tbNazwisko" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="tbNazwisko" ErrorMessage="Pole wymagane" ForeColor="#FF0066">Pole wymagane</asp:RequiredFieldValidator>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">email (przyklad: nazwa@poczta.pl)</td>
                <td class="auto-style3">
                    <asp:TextBox ID="tbEmail" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="tbEmail" ErrorMessage="Pole wymagane" ForeColor="#FF0066">Pole wymagane</asp:RequiredFieldValidator>
                </td>
                <td>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="tbEmail" ErrorMessage="Bledny email" ForeColor="#FF0066" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">data urodzenia (przykład 12.12.1992)</td>
                <td class="auto-style3">
                    <asp:TextBox ID="tbData" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="tbData" ErrorMessage="Pole wymagane" ForeColor="#FF0066">Pole wymagane</asp:RequiredFieldValidator>
                </td>
                <td>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator5" runat="server" ControlToValidate="tbData" ErrorMessage="Bledna data urodzenia" ForeColor="#FF0066" ValidationExpression="\d\d.\d\d.\d\d\d\d">Bledna data urodzenia</asp:RegularExpressionValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">kod pocztowy - USA (przykład: <span style="color: rgb(48, 48, 48); font-family: &quot;Open Sans Regular&quot;, Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); display: inline !important; float: none;">43209)</span></td>
                <td class="auto-style3">
                    <asp:TextBox ID="tbKod" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="tbKod" ErrorMessage="Pole wymagane" ForeColor="#FF0066">Pole wymagane</asp:RequiredFieldValidator>
                </td>
                <td>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" ControlToValidate="tbKod" ErrorMessage="Bledny kod pocztowy" ForeColor="#FF0066" ValidationExpression="\d{5}(-\d{4})?"></asp:RegularExpressionValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">telefon - USA (<span style="color: rgb(26, 75, 84); font-family: &quot;Open Sans Regular&quot;, Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); display: inline !important; float: none;">przykład: 0014142416256<span class="Apple-converted-space">)</span></span></td>
                <td class="auto-style3">
                    <asp:TextBox ID="tbTel" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="tbTel" ErrorMessage="Pole wymagane" ForeColor="#FF0066">Pole wymagane</asp:RequiredFieldValidator>
                </td>
                <td>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator4" runat="server" ControlToValidate="tbTel" ErrorMessage="Bledny telefon" ForeColor="#FF0066" ValidationExpression="^([\+]?(?:00)?[0-9]{1,3}[\s.-]?[0-9]{1,12})([\s.-]?[0-9]{1,4}?)$"></asp:RegularExpressionValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">&nbsp;</td>
                <td class="auto-style3">
                    <asp:Button ID="tbSend" runat="server" OnClick="tbSend_Click" Text="Add" />
                </td>
                <td>
                    <asp:Button ID="Check" runat="server" OnClick="Check_Click" Text="Wyniki" />
                </td>
            </tr>
            <tr>
                <td class="auto-style2">&nbsp;</td>
                <td class="auto-style3">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
