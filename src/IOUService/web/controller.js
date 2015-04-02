﻿var controller = {
    view: undefined,
    api: undefined,
    setup: function (view, api) {
        controller.view = view;
        controller.api = api;

        controller.setup_view();
        controller.setup_api();
        controller.refresh_view();
    },
    setup_view: function () {
        controller.view.send_button.click(function () {
            controller.send_note();
        });

        controller.view.refresh_button.click(function () {
            controller.load_received_notes();
        });
    },
    setup_api: function () {
        controller.api.delegate = controller;
        controller.api.on_sent_notes_loaded = controller.show_sent_notes;
        controller.api.on_received_notes_loaded = controller.show_received_notes;
    },
    refresh_view: function () {
        // is our api coherent enough? This three lines look like they could go into the api.
        // but that would create ugliness there. Maybe we miss something?
        controller.api.load_current_user();
        controller.api.load_sent_notes();
        controller.api.load_received_notes();
    },
    send_note: function() {
        controller.api.send_note(controller.view.recipient_label.val());
    },
    load_received_notes: function() {
        controller.api.load_received_notes();
    },
    show_sent_notes: function(notes) {
        controller.view.show_sent_notes(notes);
    },
    show_received_notes: function(notes) {
        controller.view.show_received_notes(notes);
    },
    on_current_user_loaded: function(current_user_name) {
        controller.view.show_current_user_name(current_user_name);
    },
}