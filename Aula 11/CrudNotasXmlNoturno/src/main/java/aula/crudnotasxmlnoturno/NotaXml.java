package aula.crudnotasxmlnoturno;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.time.LocalDate;
import java.time.LocalTime;

public class NotaXml {
    private Document doc;
    public NotaXml(File arquivo) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory fabrica=DocumentBuilderFactory.newInstance();
        DocumentBuilder construtor= fabrica.newDocumentBuilder();
        doc=construtor.parse(arquivo);
    }
    public NotaXml(String dados) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory fabrica=DocumentBuilderFactory.newInstance();
        DocumentBuilder construtor= fabrica.newDocumentBuilder();
        InputSource fonte=new InputSource(new StringReader(dados));
        doc=construtor.parse(fonte);
    }
    public void inserirNovaNota(NotaXml novaNota)
    {
        Element raiz=doc.getDocumentElement();
        Element novoElemento=novaNota.doc.getDocumentElement();
        doc.adoptNode(novoElemento);

        Element data=doc.createElement("data");
        Element hora=doc.createElement("hora");

        data.setTextContent(LocalDate.now().toString());
        hora.setTextContent(LocalTime.now().toString());
        novoElemento.appendChild(data);
        novoElemento.appendChild(hora);
        raiz.appendChild(novoElemento);
    }
    public void serealizar(String caminho) throws TransformerException {
        TransformerFactory fabrica=TransformerFactory.newInstance();
        Transformer transformador=fabrica.newTransformer();
        DOMSource fonte=new DOMSource(doc);
        StreamResult saida=new StreamResult(caminho);
        transformador.transform(fonte,saida);
    }
    public void serealizar(Writer out) throws TransformerException {
        TransformerFactory fabrica=TransformerFactory.newInstance();
        Transformer transformador=fabrica.newTransformer();
        DOMSource fonte=new DOMSource(doc);
        StreamResult saida=new StreamResult(out);
        transformador.transform(fonte,saida);
    }
    public String serealizar() throws TransformerException {
        TransformerFactory fabrica=TransformerFactory.newInstance();
        Transformer transformador=fabrica.newTransformer();
        DOMSource fonte=new DOMSource(doc);
        StringWriter escritor=new StringWriter();
        StreamResult saida=new StreamResult(escritor);
        transformador.transform(fonte,saida);
        return escritor.toString();
    }
}
