<?php
namespace App\Console\Commands;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use App\User;
class AddAdminCommand extends Command {
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'add:admin';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Add Admin user";
    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {

        $username = $this->input->getOption('username');
        $password = $this->input->getOption('password');
        $name = $this->input->getOption('name');
        $data = array(
            'name' => $name,
            'username' => $username,
            'password' => $password,
            'role' => 'admin'
        );
        $data['password'] = User::hashPass($data['password']);
        $user = User::create($data);
        $this->info("Created user $username");

    }
    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return array(
            array('username', null, InputOption::VALUE_OPTIONAL, 'Username', 'admin'),
            array('password', null, InputOption::VALUE_OPTIONAL, 'Password', 'admin'),
            array('name', null, InputOption::VALUE_OPTIONAL, 'Name of admin', 'Admin')
        );
    }
}