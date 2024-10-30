package com.exampleTest.TestManager.controller;


import com.exampleTest.TestManager.entity.Roles;
import com.exampleTest.TestManager.service.RolesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/Roles")
public class RolesController {
    private final RolesService rolesService;
    public RolesController(RolesService rolesService) {
        this.rolesService = rolesService;
    }

    @PostMapping
    public ResponseEntity<Roles> addRoles(@RequestBody Roles roles) {
        Roles newRoles = rolesService.addRoles(roles);
        return new ResponseEntity<>(newRoles, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Roles>> getAllRoles() {
        List<Roles> roles = rolesService.getAllRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Roles> getRolesById(@PathVariable Long id) {
        Roles roles = rolesService.getRoleById(id);
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRolesById(@PathVariable Long id) {
        rolesService.deleteRoleById(id);
        return ResponseEntity.ok("Role has been deleted");
    }
    @PutMapping("{id}")
    public ResponseEntity<Roles> updateRoles(@PathVariable Long id, @RequestBody Roles roles) {
        Roles updateRole = rolesService.updateRole(id, roles);
        return new ResponseEntity<>(updateRole, HttpStatus.OK);
    }
}
