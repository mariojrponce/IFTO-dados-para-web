package aula.jsoncomjava;

import jakarta.json.*;

import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ManipuladorJson {
    public static String PessoaParaJson(Pessoa p)
    {
        /*JsonObjectBuilder construtor= Json.createObjectBuilder();
        construtor.add("nome", p.getNome());
        construtor.add("idade",p.getIdade());
        JsonObject objetoJson=construtor.build();
         */

        JsonObjectBuilder construtorObjeto=Json.createObjectBuilder()
                .add("nome", p.getNome())
                .add("idade",p.getIdade());
        JsonArrayBuilder construtorArray=Json.createArrayBuilder();

        for(String telefone:p.getTelefones())
            construtorArray.add(telefone);

        JsonObject objetoJson=construtorObjeto
                .add("telefones",construtorArray)
                .build();

        StringWriter sw=new StringWriter();
        JsonWriter escritor=Json.createWriter(sw);
        escritor.writeObject(objetoJson);
        return sw.toString();
    }
    public static Pessoa JsonParaPessoa(String json){
        Pessoa p=new Pessoa();

        StringReader fluxo=new StringReader(json);
        JsonReader leitor=Json.createReader(fluxo);
        JsonObject objetoJson=leitor.readObject();
        p.setNome(objetoJson.getString("nome"));
        p.setIdade(objetoJson.getInt("idade"));

        int tam=objetoJson.getJsonArray("telefones").size();
        for(int i=0;i<tam;i++)
            p.getTelefones().add(objetoJson.getJsonArray("telefones").getString(i));

        return p;
    }
}
