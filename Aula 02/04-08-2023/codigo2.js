document.getElementById("botao").onclick=function(){
    const parse=new DOMParser();
    const doc=parse.parseFromString(texto,"text/xml");
    const pai=document.getElementById("caixa");
    const livro=doc.getElementsByTagName("livro")[0];
    const filhos=livro.childNodes;
    let textoHtml="";
    for(let filho of filhos)
    {
        if(filho.nodeType==1)
        {
            textoHtml+=`<p><b>${filho.nodeName}</b>: ${filho.firstChild.nodeValue}</p>`
        }
    }
    pai.innerHTML=textoHtml;
}