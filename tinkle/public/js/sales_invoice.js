
// frappe.ui.form.on('Sales Invoice Item', {
//   custom_available_qty: function (frm, cdt, cdn) {
//       let row = frappe.get_doc(cdt, cdn);

//       if (row.item_code) {
//           frappe.call({
//               method: "tinkle.tinkle.custom.sales_invoice.get_all_warehouse_quantities",
//               args: {
//                   item_code: row.item_code
//               },
//               callback: function (r) {
//                   if (r.message && r.message.status === "success") {
//                       let qty_list = r.message.data.map(warehouse_data => {
//                           // Handle undefined quantities or warehouse names
//                           let warehouse_name = warehouse_data.warehouse || "Unknown Warehouse";
//                           let available_qty = warehouse_data.actual_qty !== undefined ? warehouse_data.actual_qty : "N/A";
//                           return `<b>${warehouse_name}</b>: ${available_qty}`;
//                       }).join("<br>");
                      
//                       frappe.msgprint({
//                           title: "Available Quantities in Warehouses",
//                           message: `Available quantities for <b>${row.item_code}</b>:<br>${qty_list}`,
//                           indicator: "green"
//                       });
//                   } else {
//                       frappe.msgprint({
//                           title: "Error",
//                           message: `Could not fetch available quantities. ${r.message.message || ""}`,
//                           indicator: "red"
//                       });
//                   }
//               }
//           });
//       } else {
//           frappe.msgprint({
//               title: "Missing Information",
//               message: "Please select an item to fetch quantities.",
//               indicator: "orange"
//           });
//       }
//   }
// });



frappe.ui.form.on('Sales Invoice Item', {
    custom_available_qty: function (frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);
  
        if (row.item_code) {
            frappe.call({
                method: "tinkle.tinkle.custom.sales_invoice.get_all_warehouse_quantities",
                args: {
                    item_code: row.item_code
                },
                callback: function (r) {
                    if (r.message && r.message.status === "success") {
                        // Construct a table
                        let table_html = `
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Warehouse</th>
                                        <th>Available Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${r.message.data.map(warehouse_data => {
                                        let warehouse_name = warehouse_data.warehouse || "Unknown Warehouse";
                                        let available_qty = warehouse_data.actual_qty !== undefined ? warehouse_data.actual_qty : "N/A";
                                        return `
                                            <tr>
                                                <td>${warehouse_name}</td>
                                                <td>${available_qty}</td>
                                            </tr>
                                        `;
                                    }).join("")}
                                </tbody>
                            </table>`;
  
                        frappe.msgprint({
                            title: "Available Quantities in Warehouses",
                            message: `Available quantities for <b>${row.item_code}</b>:<br>${table_html}`,
                            indicator: "green"
                        });
                    } else {
                        frappe.msgprint({
                            title: "Error",
                            message: `Could not fetch available quantities. ${r.message.message || ""}`,
                            indicator: "red"
                        });
                    }
                }
            });
        } else {
            frappe.msgprint({
                title: "Missing Information",
                message: "Please select an item to fetch quantities.",
                indicator: "orange"
            });
        }
    }
  });
  