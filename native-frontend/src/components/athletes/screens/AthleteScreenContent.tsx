import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { IUser } from '@lib/models';
import AthleteBioTab from '../tabs/AthleteBioTab';
import { Box } from '@gluestack-ui/themed';
import TeamPreviewCard from '@Components/teams/TeamPreviewCard';
import TeamDescription from '@Components/teams/TeamDescription';
import { testUserRunner, teams } from '@Constants/dummy-data';
import CompetitionsTab from '../tabs/CompetitionsTab';
import ResultsTab from '../tabs/ResultsTab';

interface AthleteScreenContentProps {
    activeTab: number;
}

const AthleteScreenContent: React.FC<AthleteScreenContentProps> = ({activeTab}) => {
  return (
    <>
    {activeTab === 0 && <ScrollView>
          <AthleteBioTab user={testUserRunner} />
        </ScrollView>}
      {activeTab === 1 && 
      <ScrollView>
          <Box p={"$3"}>
          <TeamPreviewCard team={teams[0]} Item={TeamDescription} imageProportion={1} showLink={true} />
          </Box>
        </ScrollView>
        }
        {activeTab === 2 && (
          <ResultsTab />
        )}
        {activeTab === 3 && (
          <CompetitionsTab />
        )}
    </>
  )
}

export default AthleteScreenContent