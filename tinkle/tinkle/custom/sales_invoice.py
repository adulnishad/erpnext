# import frappe
# @frappe.whitelist()
# def get_warehouse_quantity(item_code, warehouse):
#     if not item_code or not warehouse:
#         return {"status": "error", "message": "Item code or warehouse is missing."}

#     try:
#         available_qty = frappe.db.get_value("Bin", {"item_code": item_code, "warehouse": warehouse}, "actual_qty") or 0
#         return {"status": "success", "available_qty": available_qty}
#     except Exception as e:
#         return {"status": "error", "message": str(e)}


import frappe
@frappe.whitelist()
def get_all_warehouse_quantities(item_code):
    if not item_code:
        return {"status": "error", "message": "Item code is missing."}

    try:
        # Fetch available quantities from all warehouses
        warehouse_data = frappe.db.sql("""
            SELECT warehouse, actual_qty 
            FROM `tabBin` 
            WHERE item_code = %s
        """, item_code, as_dict=True)

        # Debug log for verification
        frappe.log_error(message=warehouse_data, title="Warehouse Quantity Debug")

        # Format the response
        if warehouse_data:
            return {"status": "success", "data": warehouse_data}
        else:
            return {"status": "error", "message": "No warehouses found with available quantities for this item."}
    except Exception as e:
        frappe.log_error(message=str(e), title="Error in get_all_warehouse_quantities")
        return {"status": "error", "message": str(e)}
