onload=function(){
    const doc=analisador();
    const livros=doc.getElementsByTagName("livro");
    
    let texto="";
    /*for(let i=0;i<livros.length;i++)
        texto+= deLivroParaLinha(livros[i]);*/
    
    for(let livro of livros)
    texto+= deLivroParaLinha(livro);
    const corpo=this.document.querySelector("tbody");
    corpo.innerHTML=texto;
}
function analisador()
{
    const parser=new DOMParser();
    return parser.parseFromString(texto,"text/xml");
}
function deLivroParaLinha(livro)
{
    //const titulo=livro.getElementsByTagName("titulo")[0].firstChild.nodeValue;
    //const titulo=livro.querySelector("titulo").firstChild.nodeValue;
    const titulo=livro.querySelector("titulo").textContent;
    const autor=livro.querySelector("autor").textContent;
    const ano=livro.querySelector("ano").textContent;
    const preco=livro.querySelector("preco").textContent;
    return `<tr>
        <td>${titulo}</td>
        <td>${autor}</td>
        <td>${ano}</td>
        <td>${preco}</td>
    </tr>`;
}