package ru.kata.spring.boot_security.demo.dbinit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class DatabaseStart {
    private final UserService userService;
    private final RoleService roleService;
    @Autowired
    public DatabaseStart(UserService userService, RoleService roleService){

        this.userService = userService;
        this.roleService = roleService;

    }
    @PostConstruct
    public void initDatabase(){
        Role admin = new Role("ROLE_ADMIN");
        Role user = new Role("ROLE_USER");
        roleService.addRole(admin);
        roleService.addRole(user);
        Set<Role> roleAdm = Set.of(admin);
        Set<Role> roleUs = Set.of(user);

        userService.saveUser(new User("admin",
                "admin@mail.ru",
                "admin",
                roleAdm));
        System.out.println(roleAdm+""+roleUs);
        userService.saveUser(new User("user",
                "user@mail.ru",
                "user",
                roleUs));
    }
}