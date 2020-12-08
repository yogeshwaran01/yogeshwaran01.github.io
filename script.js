function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}​
var id = GetURLParameter('id')
var url = 'https://yogeshwaran01.herokuapp.com/post/id?=' + id
var content = "0; URL=" + url

document.getElementById('redirect').setAttribute('content', content)
document.getElementById('link').setAttribute('href', url)
