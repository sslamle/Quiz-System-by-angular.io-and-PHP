<?php

namespace SS;

use Laravel\Lumen\Application as LumenApplication;

class Application extends LumenApplication {
    /**
     * The path of the database directory.
     *
     * @var string
     */
    protected $databasePath;

    /**
     * The path of the resources directory.
     *
     * @var string
     */
    protected $resourcePath;


    /**
     * Get the path to the database directory.
     *
     * @param  string  $path
     * @return string
     */
    public function databasePath($path = '')
    {
        if (isset($this->databasePath)) return $this->databasePath.($path ? DIRECTORY_SEPARATOR.$path : $path);

        return $this->basePath.DIRECTORY_SEPARATOR.'database'.($path ? DIRECTORY_SEPARATOR.$path : $path);
    }

    public function setDatabasepath($path) {
        $this->databasePath = $path;
    }


    /**
     * Get the path to the resources directory.
     *
     * @param  string|null  $path
     * @return string
     */
    public function resourcePath($path = '')
    {
        if (isset($this->resourcePath)) return $this->resourcePath.($path ? DIRECTORY_SEPARATOR.$path : $path);
        return $this->basePath.DIRECTORY_SEPARATOR.'resources'.($path ? DIRECTORY_SEPARATOR.$path : $path);
    }

    public function setResourcePath($path) {
        $this->resourcePath = $path;
    }

    /**
     * Get the path to the application's language files.
     *
     * @return string
     */
    protected function getLanguagePath()
    {
        if (is_dir($langPath = $this->resourcePath().'/lang')) {
            return $langPath;
        } else {
            return parent.getLanguagepath();
        }
    }

}
