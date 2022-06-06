package io.getarrays.server;

import io.getarrays.server.model.Server;
import io.getarrays.server.repo.ServerRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static io.getarrays.server.enumeration.Status.SERVER_DOWN;
import static io.getarrays.server.enumeration.Status.SERVER_UP;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ServerRepo serverRepo) {
		return args -> {
			serverRepo.save(new Server(null, "192.168.1.160", "Ubuntu Linux", "16 GB", "Personal PC",
					"http://localhost:8080/server/image/server1.png", SERVER_UP));
			serverRepo.save(new Server(null, "192.168.0.165", "Ubuntu Linux (Server)", "32 GB", "Server PC",
					"http://localhost:8080/server/image/server3.png", SERVER_UP));
			serverRepo.save(new Server(null, "192.168.1.161", "Windows 11", "8 GB", "Home Computer",
					"http://localhost:8080/server/image/server2.png", SERVER_DOWN));
			serverRepo.save(new Server(null, "192.124.1.151", "Windows 11 (Gaming)", "64 GB", "Gaming PC",
					"http://localhost:8080/server/image/server4.png", SERVER_UP));
		};
	}
}
