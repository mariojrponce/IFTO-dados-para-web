onload=function(){
    let pai=document.getElementById("caixa");
    let ps=pai.getElementsByTagName("p");
    /*for(let i=0;i<ps.length;i++)
    {
        let p=ps[i];
        alert(p);
    }*/
    /*for(let i in ps)
    {
        alert(ps[i]);
    }*/

    /*for(let p of ps)
        alert(p)*/

    /*let filhos=pai.childNodes;
    for(let f of filhos)
    {
        if(f.nodeType==1)
            alert(f.nodeName);
    }*/
 /*   let filho=pai.firstChild;
    while(filho!=null)
    {
        if(filho.nodeType==1)
            alert(filho.nodeName+": "+filho.firstChild.nodeValue);
        filho=filho.nextSibling;
    }*/

    //pegando todos os atributos 

   /* alert("O id é: "+pai.getAttribute("id"));

    
    let atributos=pai.attributes;

    //let atributo = atributos.getNamedItem("id");
    let atributo = atributos["id"];
    this.alert(atributo.nodeName);

    for(let atributo of atributos)
    {
        //alert(atributo.nodeName+": "+ atributo.nodeValue);
        alert(`${atributo.nodeName}: ${atributo.nodeValue}`);
    }*/

    /*let avo=pai.parentNode;
    alert(avo.nodeName);

    let raiz=document.documentElement;
    this.alert(raiz.nodeName);*/
    pai.getElementsByTagName("h1")[0].firstChild.nodeValue="Ola você ai";

}