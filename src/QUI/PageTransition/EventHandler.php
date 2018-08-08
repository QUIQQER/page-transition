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
        $Project    = QUI::getRewrite()->getProject();
        $transition = $Project->getConfig('quiqqer.pagetransition.type');

        if (empty($transition) || $transition === "0") {
            return;
        }

        $Template->extendHeaderWithCSSFile(URL_OPT_DIR.'quiqqer/page-transition/bin/page-transition.css');
        $Template->extendHeaderWithJavaScriptFile(URL_OPT_DIR.'quiqqer/page-transition/bin/page-transition.js');


        $header = '<script type="text/javascript">';
        $header .= 'var QUIQQER_PAGE_TRANSITION = "'.htmlspecialchars($transition).'";';
        $header .= '</script>';

        $Template->extendHeader($header);
    }

    /**
     * @param string $output
     */
    public static function onRequestOutput(&$output)
    {
        $Project    = QUI::getRewrite()->getProject();
        $transition = $Project->getConfig('quiqqer.pagetransition.type');

        if (empty($transition) || $transition === "0") {
            return;
        }

        $placer = '
            <noscript>
                <style>
                 .quiqqer-page-transition {
                       display: none;
                 }
                </style>
            </noscript>
            <div class="quiqqer-page-transition">
            <div class="quiqqer-page-transition-loader">
                <div class="sk-circle">
                    <div class="sk-circle1 sk-child"></div>
                    <div class="sk-circle2 sk-child"></div>
                    <div class="sk-circle3 sk-child"></div>
                    <div class="sk-circle4 sk-child"></div>
                    <div class="sk-circle5 sk-child"></div>
                    <div class="sk-circle6 sk-child"></div>
                    <div class="sk-circle7 sk-child"></div>
                    <div class="sk-circle8 sk-child"></div>
                    <div class="sk-circle9 sk-child"></div>
                    <div class="sk-circle10 sk-child"></div>
                    <div class="sk-circle11 sk-child"></div>
                    <div class="sk-circle12 sk-child"></div>
                </div>
            </div>
        </div>';

        $output = preg_replace(
            '#<body([^>]*)>#i',
            '<body$1>'.$placer,
            $output
        );
    }
}
