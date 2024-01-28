use strict;
use warnings;
use HTTP::Daemon;
use HTTP::Status;
use YAML::XS;

package Server;

sub new {
    my ($class, %args) = @_;
    my $self = bless {
        LocalAddr => $args{LocalAddr} || 'localhost',
        LocalPort => $args{LocalPort} || 8080,
    }, $class;
    return $self;
}

sub start {
    my ($self) = @_;
    my $daemon = HTTP::Daemon->new(
        LocalAddr => $self->{LocalAddr},
        LocalPort => $self->{LocalPort},
    ) or die "Failed to start HTTP server: $!";
    print "Server started at ", $daemon->url, "\n";

    while (my $client = $daemon->accept) {
        while (my $request = $client->get_request) {
            if ($request->method eq 'GET' && $request->url->path =~ m{^/translate/(\w+)$}) {
                my $id = $1;
                my $lang = $request->url->query_param('lang') || 'en';

                my $translation = $self->get_translation($id, $lang);
                if ($translation) {
                    $client->send_response(HTTP::Response->new(200, 'OK', [ 'Content-Type' => 'text/plain' ], $translation));
                } else {
                    $client->send_error(HTTP_NOT_FOUND);
                }
            } else {
                $client->send_error(HTTP_NOT_FOUND);
            }
        }
        $client->close;
        undef $client;
    }
}

sub get_translation {
    my ($self, $id, $lang) = @_;

    my $translations = YAML::XS::LoadFile('translation.yaml');
    return $translations->{$id}->{$lang};
}

1;
