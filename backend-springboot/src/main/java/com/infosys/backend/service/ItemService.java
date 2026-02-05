package com.infosys.backend.service;

import com.infosys.backend.model.Item;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ItemService {
    private final List<Item> items = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(3);

    public ItemService() {
        // Initialize with sample data
        items.add(new Item(1L, "Task 1", false));
        items.add(new Item(2L, "Task 2", true));
        items.add(new Item(3L, "Task 3", false));
    }

    public List<Item> getAllItems() {
        return new ArrayList<>(items);
    }

    public Item createItem(String name) {
        Item newItem = new Item(idCounter.incrementAndGet(), name, false);
        items.add(newItem);
        return newItem;
    }

    public Optional<Item> deleteItem(Long id) {
        Optional<Item> itemToDelete = items.stream()
                .filter(item -> item.getId().equals(id))
                .findFirst();
        
        itemToDelete.ifPresent(items::remove);
        return itemToDelete;
    }
}
