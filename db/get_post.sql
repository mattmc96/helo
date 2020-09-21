SELECT title, content, img, profile_pic AS author_pic, username AS author 
FROM posts p 
JOIN users u ON u.id = p.author_id
WHERE p.id = $1;