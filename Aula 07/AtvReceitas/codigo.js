function ajax(recurso,funcao)
{
    const xhr=new XMLHttpRequest();
        xhr.onreadystatechange=funcao;
        xhr.open("get",recurso,true);
        xhr.send();
}

onload=()=>{
        ajax("receitas.xml",mostraXML);

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
                texto+=`<p>${filho.textContent}</p>`
        }
        document.getElementById("container").innerHTML=texto

    }
    
}
