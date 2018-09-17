# Wamp version
- wamp: 3.1.0 64 bit
- MySQL: 5.7.19
- PHP: 7.1.9
- Apache: 2.4.27

# Migration

https://laravel.com/docs/5.6/migrations

`php artisan make:migration create_users_table --table=users`
`php artisan migrate`

# Seeder (Tạo dữ liệu ban đầu)

https://laravel.com/docs/5.6/seeding

## Create
`php artisan make:seeder UsersTableSeeder`

## Run
`composer dump-autoload`
`php artisan db:seed`
`php artisan db:seed --class=UsersTableSeeder`

# Việt hóa
- Copy thư mục `lang` trong `vendor\laravel\lumen-framework\resource` vào thư mục `resource`.
- Tạo tư mục `vi` giống thư mục `en`
- Config `APP_LOCALE=vi` trong file `.env`

# Datetime

```
use Carbon\Carbon;

$date = new Carbon($test->created_at);

$now = Carbon::now();

```

# Apache

Chỉnh Apache để các máy khác có thể truy cập vào

```
left click wampmanager -> Apache -> httpd-vhost.conf
```

```
#
# Virtual Hosts
#

<VirtualHost *:80>
    ServerName localhost
    DocumentRoot c:/wamp/www
    <Directory  "c:/wamp/www/">
        Options +Indexes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

# Cấu hình DB

Cấu hình DB trong file `/config/databases.php`