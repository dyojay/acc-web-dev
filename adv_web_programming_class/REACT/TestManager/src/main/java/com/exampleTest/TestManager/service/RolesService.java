package com.exampleTest.TestManager.service;

import com.exampleTest.TestManager.entity.Roles;
import com.exampleTest.TestManager.repository.RolesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class RolesService {

    private final RolesRepository rolesRepository;

    public Roles create(Roles roles) {
        return rolesRepository.save(roles);
    }


}
