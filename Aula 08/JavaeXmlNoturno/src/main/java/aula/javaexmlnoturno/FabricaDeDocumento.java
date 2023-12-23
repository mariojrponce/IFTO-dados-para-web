package aula.javaexmlnoturno;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

public class FabricaDeDocumento {
    private FabricaDeDocumento(){}
    public static Document geraDocumento(String caminho){
        try {
            DocumentBuilderFactory fabrica=DocumentBuilderFactory.newInstance();
            DocumentBuilder construtor= fabrica.newDocumentBuilder();
            Document doc=construtor.parse(caminho);
            return doc;
        } catch (ParserConfigurationException | SAXException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
