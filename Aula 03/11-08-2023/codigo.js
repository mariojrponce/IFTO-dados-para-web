onload=function(){
    document.getElementById("btMudarH1").addEventListener("click",() => {
        //const h1=document.getElementsByTagName("h1")[0];
        const h1=document.querySelector("h1");
        const noTexto=h1.firstChild;
        noTexto.nodeValue=document.getElementById("caixa").value;
    
        //h1.style.color="yellow";
        h1.setAttribute("class","vermelho");
    
        //const atributo=h1.getAttributeNode("class");
        //atributo.nodeValue="vermelho";
    });

    document.getElementById("btDeletarParagrafo").addEventListener("click",()=>{
        const p=document.querySelector("p");
        /*const pai=document.getElementsByTagName("body")[0];
        pai.removeChild(p);*/

        //p.parentNode.removeChild(p);

        /*const noTexto=p.firstChild;
        p.removeChild(noTexto);*/
        p.firstChild.nodeValue=""

    });

    document.getElementById("btRemoveAtributo").addEventListener("click",()=>{
        const h1=document.querySelector("h1");
        h1.removeAttribute("class");

        const botao=document.getElementById("btMudarH1")
        botao.removeAttribute("type");
        botao.removeAttribute("value");
    });

    this.document.getElementById("btCriarLinha").onclick=()=>{
        const novo= document.createElement(document.getElementById("caixa").value);
        const pai=this.document.querySelector("body");
        pai.appendChild(novo);

    }
    document.getElementById("btCriarParagrafo").onclick=function(){
        const pai=document.getElementById("container");
        const p=document.createElement("p");
        const negrito=document.createElement("b");
        const noTexto=document.createTextNode(document.getElementById("caixa").value)
        negrito.appendChild(noTexto)
        p.appendChild(negrito);
        pai.appendChild(p);
    }
    document.getElementById("btCriarImagem").onclick=()=>{
        const imagem=document.createElement("img");
        const atributoAlt=document.createAttribute("alt");
        atributoAlt.nodeValue="Imagem de uma arvore";
        imagem.setAttributeNode(atributoAlt);

        imagem.setAttribute("src","arvore.avif");
        imagem.setAttribute("width","100");

        const p=this.document.querySelector("p");

        document.querySelector("body").insertBefore(imagem,p);
    }
    document.getElementById("btInseriTexto").onclick=()=>{
        const p=document.getElementById("ola");
        const noTexto=p.firstChild;
        noTexto.insertData(4,"nosso ")
    }
    document.getElementById("btTrocarTexto").onclick=()=>{
        const p=document.getElementById("ola");
        const noTexto=p.firstChild;
        noTexto.replaceData(4,1,"Planeta")
    }
    document.getElementById("btTrocarFilho").onclick=()=>{
        const pai=document.querySelector("body");
        const p=document.getElementById("ola");
        const h2=this.document.createElement("h2");
        const noTexto=this.document.createTextNode("Novo valor no h2");
        h2.appendChild(noTexto);
        pai.replaceChild(h2,p);
    }
    document.getElementById("btClonar").onclick=function(){
        const container=document.getElementById("container");
        const copia=container.cloneNode(true);
        document.querySelector("body").appendChild(copia);
    }
}



