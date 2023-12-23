function ajax(recurso,dados,funcao,metodo)
{
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=funcao;
    if(metodo.toLowerCase()==="get") {
        recurso += "?"+ dados;
        xhr.open(metodo, recurso);
        xhr.send();
    }else if(metodo.toLowerCase()==="post")
    {
        xhr.open(metodo, recurso);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(dados);
    }
}
onload=()=>
{
    document.getElementById("btCadastrar").onclick=(evento)=>{
        evento.preventDefault();
        const nome=document.getElementById("nome").value;
        const idade=document.getElementById("idade").value;
        dados=`nome=${nome}&idade=${idade}`;
        ajax("inserir",dados,function (){
            if(this.readyState==4 && this.status==200)
            {
                buscaPessoas();
                alert(this.responseText);
            }
        },"post");
    }
    buscaPessoas();
}
function buscaPessoas(){
    ajax("buscar","",function (){
        if(this.readyState==4 && this.status==200)
        {
            mostrarDados(this.responseXML)
        }
    },"get");
}
function mostrarDados(doc)
{
    const pessoas=doc.documentElement.getElementsByTagName("pessoa");
    let texto="";
    for(let p of pessoas)
    {

        const id=p.getElementsByTagName("id")[0].textContent;
        texto+=`<tr>
                <td>${id}</td>
                <td>${p.getElementsByTagName("nome")[0].textContent}</td>
                <td>${p.getElementsByTagName("idade")[0].textContent}</td>
                <td><a href="deletar?id=${id}">Deletar</a></td>
                <td><a href="editar?id=${id}">Editar</a></td>
           </tr>`;
    }
    document.querySelector("tbody").innerHTML=texto;
}