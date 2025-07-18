SELECT
    s.,
    b.name AS brandName
FROM
    "Shoes" s
JOIN 
    "Brand" b ON s."brandId" = b.id;