function ajax(recurso,dados,funcao,metodo)
{
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=funcao;
    if(metodo.toLowerCase()==="get") {
        recurso += "?dados=" + dados;
        xhr.open(metodo, recurso);
        xhr.send();
    }else if(metodo.toLowerCase()==="post")
    {
        xhr.open(metodo, recurso);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send("dados="+dados);
    }
}
onload=()=>{
    document.getElementById("btCadastrar").addEventListener("click",(evento)=>{
       evento.preventDefault();
       //pegar os dados do formulario
        const dados=pegarDadosDoFormulario();
        //chamo a funcao ajax e passo os dados como parametro
        ajax("cadastrar",dados,mostraResposta,"post");
    });
}
function pegarDadosDoFormulario(){
    return `<nota>
            <de>${document.getElementById("de").value}</de>
            <para>${document.getElementById("para").value}</para>
            <cabecalho>${document.getElementById("cabecalho").value}</cabecalho>
            <corpo>${document.getElementById("corpo").value}</corpo>
        </nota>`;
}
function mostraResposta(){
    if(this.readyState==4)
    {
        const raiz=this.responseXML.documentElement;
        alert(raiz.textContent);
    }
}