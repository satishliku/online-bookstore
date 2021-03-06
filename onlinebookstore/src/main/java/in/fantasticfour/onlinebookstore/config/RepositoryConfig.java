package in.fantasticfour.onlinebookstore.config;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import in.fantasticfour.onlinebookstore.entity.Book;



@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer{

	@Autowired
	private EntityManager entityManager;
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		
		//below line for expose to Single entity class Id
		//config.exposeIdsFor(Book.class);
		
		//below line for expose to all entity class Id
		  config.exposeIdsFor(entityManager.getMetamodel().getEntities() .stream()
		  .map(Type::getJavaType) .toArray(Class[]::new) );
		 
		 config.getCorsRegistry()
		 		.addMapping("/**")
		 		//we can add multiple host .allowedOrigins("http://localhost:4200","http://localhost:4311");
		 		.allowedOrigins("http://localhost:4200");
	}
}
