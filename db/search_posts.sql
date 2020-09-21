SELECT p.id AS post_id, title, content, img, profile_pic, username AS author_username 
FROM posts p 
JOIN 
WHERE lower(title) LIKE $1
AND author_id != $2;