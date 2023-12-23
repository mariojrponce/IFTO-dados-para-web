function  ajax(recurso,funcao){
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=funcao;
    xhr.open("get",recurso,true);
    xhr.send();
}
onload=()=>{
    ajax("serealizar",mostrar);
}
function mostrar(){
    if(this.readyState==4&&this.status==200)
    {
        const raiz=this.responseXML.documentElement;
        const filhos=raiz.childNodes;
        let texto="";
        for(let filho of filhos)
        {
            if(filho.nodeType==1)
            {
                texto+=`<p><b>${filho.nodeName}</b>: ${filho.firstChild.nodeValue}</p>`
            }
        }
        document.getElementById("saida").innerHTML=texto;
    }
}