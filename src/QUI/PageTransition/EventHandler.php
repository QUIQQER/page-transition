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
        $Template->extendHeaderWithCSSFile(URL_OPT_DIR . 'quiqqer/page-transition/bin/page-transition.css');
        $Template->extendHeaderWithJavaScriptFile(URL_OPT_DIR . 'quiqqer/page-transition/bin/page-transition.js');
    }

    /**
     * @param string $output
     */
    public static function onRequestOutput(&$output)
    {
        $output = preg_replace(
            '#<body([^>]*)>#i',
            '<body$1><div class="quiqqer-page-transition"></div>',
            $output
        );
    }
}
