SELECT
    s.id,
    s.name,
    s.slug,
	s.generation,
	s."releaseDate",
	s.description,
	s.category,
	s.terrain,
	s."bestFor",
	s."imageUrl",
    	b.name AS brandName
FROM
    "Shoe" s
JOIN 
    "Brand" b ON s."brandId" = b.id;