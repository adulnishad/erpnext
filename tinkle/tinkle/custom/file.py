import frappe



def after_insert(self):
        # Create a To-Do entry
        self.create_todo_entry()

def create_todo_entry(self,method):
         
        customer = self.customer
       
        
        # Create a new ToDo entry
        todo = frappe.get_doc({
            "doctype": "ToDo",
            "description": f"{customer}", 
            "assigned_by": frappe.session.user,
            "reference_type": "Sales Order",
            "reference_name": self.name,  
            "priority": "Medium",  
            "status": "Open",

        })
        todo.insert(ignore_permissions=True)  # Ignore permissions to allow creation
        frappe.db.commit()  


# def after_save(self):
#       self.create_todo_from_stock_items()

# def create_todo_from_stock_items(self):
#     # Fetch enabled stock items
#     item_name = self.items
    
#     for item in item_name:
#         todo = frappe.get_doc({
#             "doctype": "ToDo",
#             "description": f"{item}",
#             "assigned_by": frappe.session.user,
#             "reference_type": "Item",
#             "reference_name": self.name,  
#             "priority": "Medium",  
#             "status": "Open"
#             })  
#     frappe.db.commit()
#     todo.s()

# # Call the function (or use this as a scheduled task)
# create_todo_from_stock_items()