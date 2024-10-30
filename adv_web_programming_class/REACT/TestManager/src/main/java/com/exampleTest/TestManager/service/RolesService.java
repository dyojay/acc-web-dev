package com.exampleTest.TestManager.service;

import com.exampleTest.TestManager.entity.Roles;
import com.exampleTest.TestManager.repository.ProjectRepository;
import com.exampleTest.TestManager.repository.RolesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@AllArgsConstructor
@Service
public class RolesService {

    private final RolesRepository rolesRepository;
    private final ProjectRepository projectRepository;

    public Roles addRoles(Roles roles) {
        return rolesRepository.save(roles);
    }
    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }
    public Roles getRoleById(Long id) {
        return rolesRepository.findById(id).orElse(null);
    }
    public void deleteRoleById(Long id) {
        rolesRepository.deleteById(id);
    }
    public Roles updateRole(Long id, Roles updateRole) {
        Roles existingRole = rolesRepository.findById(id).orElse(null);
        assert existingRole != null;
        existingRole.setRole(updateRole.getRole());
        return rolesRepository.save(existingRole);
    }

}
