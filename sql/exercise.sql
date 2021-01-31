use sakila;

select * from film; -- film_id
select * from film_category; -- film_id category_id
select * from category; -- category_id
-- film_id, tittle, desc, release_year, rating, category
select 
	f.film_id, f.title, f.description, f.release_year, f.rating, c.name as 'category'
from film f
join film_category fc on fc.film_id = f.film_id
join category c on c.category_id = fc.category_id
WHERE rating = 'R' and name = 'Horror' LIMIT 0, 20;

select * from actor; -- actor_id
select * from film_actor; -- actor_id film_id
select * from film; -- film_id
-- firstName, lastName, title, desc, release_year
select 
	a.first_name, a.last_name, f.title, f.description, f.relase_year
from actor a
join film_actor fa on fa.actor_id = a.actor_id
join film f on f.film_id = fa.film_id;
