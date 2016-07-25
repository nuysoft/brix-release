/* global define */
define(function() {
    return "<ul class=\"sidebar sidebar-<%= deep %>\" data-deep=\"<%= deep %>\">\n" +
        "    <% for(var i = 0, item; item = children[i]; i++ ) { %>\n" +
        "        <li>\n" +
        "            <a href=\"#<%= item.label %>\" class=\"sidebar-link sidebar-link-<%= item.deep %>\">\n" +
        "                <i class=\"<%= item.icon %>\"></i>\n" +
        "                <%= item.label %>\n" +
        "            </a>\n" +
        "            <%= item.childrenFn() %>\n" +
        "        </li>\n" +
        "    <% } %>\n" +
        "</ul>"
})