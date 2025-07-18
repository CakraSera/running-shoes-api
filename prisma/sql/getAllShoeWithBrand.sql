SELECT
    s.name,
	s.generation,
	s."releaseDate",
	s.description,
	s.category,
	s.terrain,
	s."bestFor",
	s."imageUrl",
    	b.name AS brandName
FROM
    "Shoes" s
JOIN 
    "Brand" b ON s."brandId" = b.id;