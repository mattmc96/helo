SELECT p.id as post_id, title, content, img, profile_pic, username 
AS author_username 
FROM 
posts p 
JOIN users ON u.id = p.author_id;