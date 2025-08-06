
-- number of customers that not paying shipping fee 
SELECT count(*) number_of_scammers FROM (
SELECT 
    CONCAT(c.first_name , " " , c.last_name)  as full_name, SUM(o.shipping_fee) as total_fee
FROM
    northwind.orders as o
        JOIN
    northwind.customers as c ON c.id = o.customer_id
    GROUP BY full_name having total_fee = 0) as a








-- best shippers or worst shippers 
    SELECT 
    *
FROM
    (SELECT 
        ship_name, COUNT(*) AS number_of_orders
    FROM
        northwind.orders
    GROUP BY ship_name) AS a1
WHERE
    a1.number_of_orders = ((SELECT 
            MIN(number_of_orders) AS maxNum
        FROM
            (SELECT 
                ship_name, COUNT(*) AS number_of_orders
            FROM
                northwind.orders
            GROUP BY ship_name) AS a))


            




-- number of orders and statuses per user
            SELECT 
    table_result.fullName,
    table_result.statusName,
    COUNT(orderId) as numberOfOrders
FROM
    (SELECT 
        o.id AS orderId,
            os.status_name AS statusName,
            CONCAT(c.first_name, ' ', c.last_name) AS fullName
    FROM
        northwind.orders AS o
    JOIN northwind.orders_status AS os ON os.id = o.status_id
    JOIN northwind.customers AS c ON o.customer_id = c.id) AS table_result
GROUP BY table_result.fullName , table_result.statusName order by table_result.statusName desc




-- all employees and their priviliges

SELECT 
    first_name, last_name, privilege_name
FROM
    northwind.employees as e 
        JOIN
    northwind.employee_privileges as ep ON e.id = ep.employee_id
      JOIN
    northwind.privileges as p ON p.id = ep.privilege_id