package aula.introducaodao.DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class FabricaConexao {
    public static Connection pegaConexao() throws ErroDAO{
        try {
            Class.forName("org.postgresql.Driver");
            return DriverManager.getConnection("jdbc:postgresql://localhost/aula","aluno","aluno");
        } catch (ClassNotFoundException | SQLException e) {
            throw new ErroDAO("Erro na Fabrica de conexão: "+e);
        }

    }
}
