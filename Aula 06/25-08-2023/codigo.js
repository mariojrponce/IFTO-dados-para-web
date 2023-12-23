function ajax(recurso,funcao)
{
    const xhr=new XMLHttpRequest();
        xhr.onreadystatechange=funcao;
        xhr.open("get",recurso,true);
        xhr.send();
}

onload=()=>{
    document.getElementById("btBuscaTexto").onclick=()=>{
        ajax("texto.txt",mostraTexto);
    }
    document.getElementById("btBuscaXML").onclick=()=>{
        ajax("nota.xml",mostraXML);
    }
}

function mostraTexto (){
    if(this.readyState==4)
    {
        if(this.status==200)
        {
            document.getElementById("container").innerHTML=this.responseText;
        }            
        if(this.status==404)
            console.log("Não existe o recurso")
    }
}
function mostraXML (){
    if(this.readyState==4 && this.status==200) 
    {
        const raiz=this.responseXML.documentElement;
        const filhos=raiz.childNodes;
        let texto="";
        for(let filho of filhos)
        {
            if(filho.nodeType==1)
                texto+=`<p><b>${filho.nodeName}:</b> ${filho.textContent}</p>`
        }
        document.getElementById("container").innerHTML=texto

        
    }
    
}
