import Container from "@Components/common/Container";
import UserCard from "@Components/user/UserCard";
import { Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { ITeam } from "@lib/models";
import React from "react";

const RunnersTab = ({ team }: { team: ITeam }) => {
  return (
    <ScrollView>
      <VStack p={"$3"} space="lg">
        <VStack>
          <Heading size="sm" mb={"$2"}>
            Coaches
          </Heading>
          {team.coach && (
            <Container>
              <UserCard
                description={`Coach of the ${team.name}`}
                user={team.coach.user}
              />
            </Container>
          )}
        </VStack>
        <VStack>
          <Heading size={"sm"} mb={"$2"}>
            Runners
          </Heading>
          <Container>
            {team.players.map((r) => (
              <UserCard key={r.id} user={r.user} runnerPreview={r} />
            ))}
          </Container>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default RunnersTab;
