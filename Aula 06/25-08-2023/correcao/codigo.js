onload=function(){
    ajax("livraria.xml",function(){
        if(this.readyState==4&&this.status==200)
        {
            const doc=this.responseXML;
            mostrar(doc);
        }
    });

    document.getElementById("btBuscaTitulo").onclick=()=>{
        const pesquisa=document.getElementById("inputBuscaTitulo").value;
        ajax("livraria.xml",function(){
            if(this.readyState==4&&this.status==200)
            {
                const doc=this.responseXML;
                const noLivro=buscarPorTitulo(pesquisa,doc);
                document.querySelector("tbody").innerHTML=deLivroParaLinha(noLivro);
            }
        });
    }
    
    document.getElementById("btBuscaAutor").onclick=()=>{
        const pesquisa=document.getElementById("inputBuscaAutor").value;
        mostrarLista(buscarPorAutor,pesquisa)
    }
    document.getElementById("btBuscaAno").onclick=()=>{
        const pesquisa=document.getElementById("inputBuscaAno").value;
        mostrarLista(buscarPorAno,pesquisa)
    }

}

function mostrarLista(funcao,pesquisa){
    ajax("livraria.xml",function(){
        if(this.readyState==4&&this.status==200)
        {
            const doc=this.responseXML;
            const noAnos=funcao(pesquisa,doc);
            let texto =""
            for (const ano of noAnos) {
                texto+= deLivroParaLinha(ano)
            }
            document.querySelector("tbody").innerHTML=texto;
        }
    });



}

function ajax(recurso,funcao)
{
    const xhr=new XMLHttpRequest();
        xhr.onreadystatechange=funcao;
        xhr.open("get",recurso,true);
        xhr.send();
}

function mostrar(doc)
{
    const livros=doc.getElementsByTagName("livro");
    
    let texto="";
    /*for(let i=0;i<livros.length;i++)
        texto+= deLivroParaLinha(livros[i]);*/
    
    for(let livro of livros)
        texto+= deLivroParaLinha(livro);
    const corpo=this.document.querySelector("tbody");
    corpo.innerHTML=texto;
}


function deLivroParaLinha(livro)
{
    //const titulo=livro.getElementsByTagName("titulo")[0].firstChild.nodeValue;
    //const titulo=livro.querySelector("titulo").firstChild.nodeValue;
    const titulo=livro.querySelector("titulo").textContent;
    const autores=livro.getElementsByTagName("autor");
    const ano=livro.querySelector("ano").textContent;
    const preco=livro.querySelector("preco").textContent;

    let lista="<ul>"
    for(const autor of autores)
        lista+=`<li>${autor.textContent}</li>`
    lista+="</ul>"


    return `<tr>
        <td>${titulo}</td>
        <td>${lista}</td>
        <td>${ano}</td>
        <td>${preco}</td>
        <td><input data-titulo="${titulo}" type=button value=Deletar onclick=deletar(event)></td>
        <td><input data-titulo="${titulo}" type=button value=Editar onclick=copiaDadosParaInterface(event)></td>
    </tr>`;
}

function buscarPorTitulo(pesquisa,doc)
{
    const titulos=doc.getElementsByTagName("titulo");
    for(let titulo of titulos)
    {
        if(titulo.firstChild.nodeValue==pesquisa)
            return titulo.parentNode;
    }
    return null;
}

function buscarPorAutor(pesquisa,doc)
{

    
    const autores=doc.getElementsByTagName("autor");
    let listaAutores = []
    for(let autor of autores)
    {
        if(autor.firstChild.nodeValue==pesquisa)
            listaAutores.push(autor.parentNode);
    }
    return listaAutores;
}


function buscarPorAno(pesquisa,doc)
{
    const anos=doc.getElementsByTagName("ano");
    let listaAnos = []
        for(let ano of anos)
    {
        if(ano.firstChild.nodeValue>=pesquisa)
            listaAnos.push(ano.parentNode);
    }

    return listaAnos;
}