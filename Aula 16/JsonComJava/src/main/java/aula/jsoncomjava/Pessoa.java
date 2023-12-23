package aula.jsoncomjava;

import jakarta.json.bind.annotation.JsonbProperty;

import java.util.ArrayList;
import java.util.List;

public class Pessoa {
    @JsonbProperty("nomeCompleto")
    private String nome;
    private int idade;

    List<String> telefones=new ArrayList<>();


    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public List<String> getTelefones() {
        return telefones;
    }

    public void setTelefones(List<String> telefones) {
        this.telefones = telefones;
    }

    @Override
    public String toString() {
        return "Pessoa{" +
                "nome='" + nome + '\'' +
                ", idade=" + idade +
                ", telefones=" + telefones +
                '}';
    }
}
