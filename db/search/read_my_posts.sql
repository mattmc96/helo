select p.id as post_id, title, content, img, profile_pic, username as author_username from posts p
join users u on u.id = p.author_id;