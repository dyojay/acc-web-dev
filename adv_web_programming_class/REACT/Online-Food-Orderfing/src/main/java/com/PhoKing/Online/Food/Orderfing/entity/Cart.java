package com.PhoKing.Online.Food.Orderfing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Cart {
     @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

     @OneToOne
     private User customer;

     private Long total;

     @OneToMany(mappedBy = "cart", CascadeType.ALL,orphanRemoval = true)
     private List<CartItem> items = new ArrayList<>();

}
