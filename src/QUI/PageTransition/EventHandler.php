<?php

/**
 * This file contains QUI\PageTransition\EventHandler
 */
namespace QUI\PageTransition;

use QUI;

/**
 * Class EventHandler
 *
 * @package QUI\PageTransition
 */
class EventHandler
{
    /**
     * @param QUI\Template $Template
     */
    public static function onTemplateGetHeader(QUI\Template $Template)
    {
        $Template->extendHeaderWithCSSFile(dirname(__FILE__) . '/page-transition.css');
    }

    /**
     * @param string $output
     * @return mixed
     */
    public static function onRequestOutput($output)
    {
        $output = preg_replace(
            '#<body([^>]*)>#i',
            '<div class="quiqqer-page-transition"></div>',
            $output
        );

        return $output;
    }
}
